import Dedux from '../dedux'
const { createStore, applyMiddleware } = Dedux

/*======================================================
                          TESTS
======================================================*/
describe('dedux', () => {
  describe('createStore', () => {
    it('errors if no reducer function is passed in', () => {
      expect(() => createStore()).toThrow()
      expect(() => createStore({})).toThrow()
      expect(() => createStore('foo')).toThrow()
      expect(() => createStore(() => ({}))).not.toThrow()
    })
  })

  describe('the store', () => {
    describe('getState', () => {
      it(`returns the reducer's return value`, () => {
        const reducer = () => ({ foo: 'bar' })
        const store = createStore(reducer)
        expect(store.getState().foo).toBe('bar')
      })
    })

    describe('dispatch', () => {
      it('takes an action that conforms to { type: string, ...any }', () => {
        const store = createStore(() => {})

        expect(() => {
          store.dispatch({ randomKey: 'randomValue' })
        }).toThrow()

        expect(() => {
          store.dispatch({ type: 'TEST_ACTION', randomKey: 'randomValue' })
        }).not.toThrow()
      })

      it(`dispatch should take any dispatched action and run it 
          through the reducer function to produce a new state.`, () => {
        const reducer = (state = {}, action = {}) => {
          Object.freeze(state);
          switch (action.type) {
              case "BAZIFY":
                  return { ...state, foo: 'baz' };
              default:
                  return { ...state, foo: 'bar' };
          }
        } // Your reducer function here!

        const store = createStore(reducer)

        expect(store.getState().foo).toBe('bar')

        store.dispatch({ type: 'BAZIFY' })

        expect(store.getState().foo).toBe('baz')
      })
    })

    describe('subscribe', () => {
      it(`has a subscribe method that receives updates on any state change`, () => {
        const subscriber = jest.fn()
        const reducer = (state = 0, action = {}) => {

          switch (action.type) {
            case 'CALCULATE_MEANING_OF_LIFE':
              return 42
            default:
              return state
          }
        }

        const store = createStore(reducer)

        store.subscribe(subscriber)

        store.dispatch({ type: 'CALCULATE_MEANING_OF_LIFE' })

        expect(subscriber).toHaveBeenCalledWith(42)
      })

      it(`will return a function that allows you to unsubscribe`, () => {
        const subscriber = jest.fn()
        const reducer = (state = 0, action = {}) => {
          switch (action.type) {
            case 'CALCULATE_MEANING_OF_LIFE':
              return 42
            default:
              return state
          }
        }

        const store = createStore(reducer)

        const unsubscribe = store.subscribe(subscriber)

        store.dispatch({ type: 'CALCULATE_MEANING_OF_LIFE' })

        expect(subscriber).toHaveBeenCalledTimes(1)

        unsubscribe()

        store.dispatch({ type: 'CALCULATE_MEANING_OF_LIFE' })
        expect(subscriber).toHaveBeenCalledTimes(1)
      })

      it(`unsubscribes multiple subscribers without effecting other subscribers`, () => {
        const subscriber1 = jest.fn();
        const subscriber2 = jest.fn();
        const subscriber3 = jest.fn();

        const reducer = (state = 0, action = {}) => {
          switch (action.type) {
            case 'CALCULATE_MEANING_OF_LIFE':
              return 42
            default:
              return state
          }
        }

        const store = createStore(reducer);

        const unsubscribe1 = store.subscribe(subscriber1);
        const unsubscribe2 = store.subscribe(subscriber2);
        store.subscribe(subscriber3);

        store.dispatch({ type: 'CALCULATE_MEANING_OF_LIFE' })

        expect(subscriber1).toHaveBeenCalledTimes(1);
        expect(subscriber2).toHaveBeenCalledTimes(1);
        expect(subscriber3).toHaveBeenCalledTimes(1);

        unsubscribe1();

        store.dispatch({ type: 'CALCULATE_MEANING_OF_LIFE' })

        expect(subscriber1).toHaveBeenCalledTimes(1);
        expect(subscriber2).toHaveBeenCalledTimes(2);
        expect(subscriber3).toHaveBeenCalledTimes(2);

        unsubscribe2();

        store.dispatch({ type: 'CALCULATE_MEANING_OF_LIFE' })

        expect(subscriber1).toHaveBeenCalledTimes(1)
        expect(subscriber2).toHaveBeenCalledTimes(2)
        expect(subscriber3).toHaveBeenCalledTimes(3)
      })
    })
  })

  describe.skip('applyMiddleware', () => {
    // Don't start this until you've completed part 2 of the challenge
    // it('can apply middleware to dispatched actions', () => {
    //   const reducer = () => null
    //   const spyA = jest.fn()
    //   const spyB = jest.fn()

    //   const middleWareMocker = spy => () => next => action => {
    //     spy(action)
    //     // Middleware must call 'next'
    //     next(action)
    //   }

    //   const store = createStore(reducer)

    //   applyMiddleware(store, [middleWareMocker(spyA), middleWareMocker(spyB)])

    //   const action = { type: 'ZAP' }

    //   store.dispatch(action)

    //   expect(spyA).toHaveBeenCalledWith(action)
    //   expect(spyB).toHaveBeenCalledWith(action)
    // })
  })
})
