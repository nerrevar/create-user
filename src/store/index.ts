import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface IState {
  currentUid: number
}

export const store = createStore<IState>({
  state: {
    currentUid: 0
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
})

export const key: InjectionKey<Store<IState>> = Symbol('VuexStore')

export function useStore (): Store<IState> {
  return baseUseStore(key)
}
