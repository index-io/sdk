require('dotenv').config();

const ExternalApiClient = require('../ExternalApiClient');
const readline = require('readline');
const util = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

const { CLIENT_ID: clientId, CLIENT_SECRET: clientSecret, ENVIRONMENT: environment, SCOPE: scope } = process.env;
const client = new ExternalApiClient({ clientId, clientSecret, environment, scope });

// Global defaults for common parameters
const contactId = '1';
const organizationId = '1';
const matterId = '1';
const timecardId = `timecard-${matterId}`;

const globalDefaults = {
  contactId,
  organizationId,
  matterId,
  timecardId,
  contactData: {
    id: contactId,
    firstName: 'John',
    lastName: 'Doe',
    emails: [{ type: 'work', value: 'john@example.com' }],
    config: {
      action: 'clean',
    },
  },
  organizationData: {
    id: organizationId,
    name: 'Acme Corp',
    config: {
      action: 'save',
    },
  },
  matterData: {
    id: matterId,
    title: 'Acquisition Agreement Review',
    description:
      'Review and classification of the legal agreement for the acquisition of a manufacturing facility, including regulatory compliance and corporate restructuring implications.',
    department: 'Mergers & Acquisitions',
    players: [
      {
        id: 'attorney-045',
        name: 'Elizabeth Harmon',
        type: 'attorney',
      },
    ],
    config: {
      action: 'classify',
      dataSource: 'sali',
    },
  },
  timecardData: {
    externalId: timecardId,
    externalMatterId: matterId,
    narrative: 'Drafted and revised asset purchase agreement; analyzed representations and warranties; coordinated revisions with client and opposing counsel.',
    date: new Date().toISOString(),
    hours: 1.5,
    players: [
      {
        id: 'attorney-045',
        name: 'Elizabeth Harmon',
        type: 'attorney',
      },
    ],
    config: {
      action: 'classify',
      dataSource: 'sali',
    },
  },
  eventTypes: undefined,
  dataSource: 'sp',
  referenceType: 'global-parent',
};
let lastRequest = null;

function normalizeParamName(param) {
  if (!param) return param;

  // Remove block comments and inline comments that may appear in function signatures.
  let name = param.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/g, '');

  // Remove default assignment (e.g. `foo = {}` -> `foo`)
  name = name.replace(/\s*=.*$/s, '');

  return name.trim();
}

// Dynamically get all methods from the ExternalApiClient class
const apiMethods = Object.getOwnPropertyNames(ExternalApiClient.prototype)
  .filter(
    (name) => typeof client[name] === 'function' && name !== 'constructor' && !name.startsWith('_') // Filter out methods starting with underscore
  )
  .map((name) => ({
    name,
    func: client[name].bind(client),
    params: getMethodParams(client[name]).map((rawParam) => {
      const param = normalizeParamName(rawParam);
      return {
        name: param,
        default: globalDefaults[param],
      };
    }),
  }));

// Function to get method parameters
function getMethodParams(func) {
  const funcStr = func.toString();
  const paramMatch = funcStr.match(/\(([^)]*)\)/);
  if (paramMatch && paramMatch[1]) {
    return paramMatch[1].split(',').map((param) => param.trim());
  }
  return [];
}

async function promptForApiMethod() {
  console.log('\nAvailable API methods:');
  apiMethods.forEach((method, index) => {
    console.log(`${index + 1}. ${method.name}`);
  });

  const choice = await question('Enter the number of the API method you want to call, "r" to repeat last request, or "q" to quit: ');
  if (choice.toLowerCase() === 'q') {
    rl.close();
    return null;
  }

  if (choice.toLowerCase() === 'r') {
    if (lastRequest) {
      return { method: lastRequest.method, isRepeat: true };
    } else {
      console.log('No previous request to repeat. Please choose a method.');
      return promptForApiMethod();
    }
  }

  const index = parseInt(choice) - 1;
  if (isNaN(index) || index < 0 || index >= apiMethods.length) {
    console.log('Invalid choice. Please try again.');
    return promptForApiMethod();
  }

  return { method: apiMethods[index], isRepeat: false };
}

async function promptForParams(params) {
  const values = [];
  for (const param of params) {
    const defaultValue = param.default;

    // Show the default value in a readable format
    const displayDefault = typeof defaultValue === 'object' ? JSON.stringify(defaultValue, null, 2) : defaultValue;

    console.log(`\nParameter: ${param.name}`);
    console.log(`Default value: ${displayDefault}`);

    const input = await question(`Enter value for ${param.name}\n` + `(Press Enter for default, or enter valid JavaScript/JSON)\n> `);

    if (!input.trim()) {
      values.push(defaultValue);
      continue;
    }

    try {
      // Try to evaluate the input as JavaScript
      // Note: Using Function constructor for safer evaluation
      const evaluatedInput = new Function(`return ${input}`)();

      // Convert to string if the parameter name contains 'Id' and the value is a number
      if (param.name.toLowerCase().includes('id') && typeof evaluatedInput === 'number') {
        values.push(String(evaluatedInput));
      } else {
        values.push(evaluatedInput);
      }
    } catch {
      try {
        // If JavaScript eval fails, try parsing as JSON
        const jsonInput = JSON.parse(input);
        values.push(jsonInput);
      } catch {
        // If both fail, use the input as a plain string
        console.log('Warning: Could not parse as object, using as plain string');
        values.push(input);
      }
    }
  }
  return values;
}

async function callApiMethod(method, params) {
  try {
    // Store the current request
    lastRequest = { method, params };

    console.log('\nCalling method with parameters:');
    method.params.forEach((param, index) => {
      console.log(`${param.name}:`, JSON.stringify(params[index], null, 2));
    });

    const result = await method.func(...params);
    console.log('\nAPI Response:');
    if (result) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('No result');
    }
  } catch (error) {
    console.error('Error calling API:', error.message);
  }
}

async function main() {
  console.log('Welcome to the ExternalApiClient CLI Tool!');

  while (true) {
    const result = await promptForApiMethod();
    if (!result) break;

    const { method, isRepeat } = result;
    let params;

    if (isRepeat) {
      params = lastRequest.params;
      console.log('Using parameters from the last request.');
    } else {
      params = await promptForParams(method.params);
    }

    await callApiMethod(method, params);
  }

  console.log('Thank you for using the ExternalApiClient CLI Tool. Goodbye!');
}

main().catch(console.error);
