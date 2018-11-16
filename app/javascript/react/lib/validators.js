const isNotBlank = (input) => input.trim() !== '';

const validators = {};
validators.year = (input) => (input !== '' && input.toString().length === 4);
validators.model = (input) => isNotBlank(input);
validators.make = (input) => isNotBlank(input);
validators.title = (input) => isNotBlank(input);
validators.description = (input) => isNotBlank(input);

const validate = function(input, validator, context) {
  const isValid = validators[validator](input);
  if (!isValid) {
    let newError = { title: `You must enter a Valid ${validator}!` };
    context.setState({ errors: Object.assign({}, context.state.errors, newError) });
    return false;
  }
  let errorState = context.state.errors
  delete errorState.inputError;
  context.setState({ errors: errorState });
  return true;
};

module.exports = { validate };
