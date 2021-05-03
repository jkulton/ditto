import getAction from './get';
import putAction from './put';
import deleteAction from './delete';

export default {
  GET: {
    handler: getAction.handler,
  },
  PUT: {
    handler: putAction.handler,
    validator: putAction.validator,
  },
  DELETE: {
    handler: deleteAction.handler,
  },
};
