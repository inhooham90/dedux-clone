export default {
  createStore,
  applyMiddleware,
}

function createStore(reducer) {
  if (typeof(reducer) != "function") throw 'Invalid reducer';

  const store = {};
  store.state = reducer();
  store.middlewares = [];

  store.listeners = [];

  store.getState = () => {
    return store.state;
  }

  store.dispatch = (action) => {
    if (action.type == null) throw 'Invalid action type';

    store.state = reducer(store.state, action);
    store.middlewares.map(middleware => middleware(action));
    store.listeners.forEach(listener => listener(store.state));

    return store;
  };

  store.subscribe = listener => {
    store.listeners.push(listener);
    
    return () => {
        let index = store.listeners.indexOf(listener);
        store.listeners.splice(index, 1);
    };
  };

  return store;
}

function applyMiddleware(store, middlewares = []) {
  return store.middlewares = middlewares;
}
