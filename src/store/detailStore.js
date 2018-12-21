import { observable } from 'mobx'

class detailStore {
    @observable detail = '这是详情的store'
}

export default new detailStore()