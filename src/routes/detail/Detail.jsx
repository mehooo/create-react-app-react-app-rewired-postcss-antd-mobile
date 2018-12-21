import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'
import {Button} from 'antd-mobile';

@inject('listStore')
@inject('detailStore')
@observer
class Detail extends Component {
    render() {
        const { listStore, detailStore } = this.props;
        const { number, increase } = listStore;
        return (
            <Button type="primary" onClick={increase}>{detailStore.detail}Detail {number}</Button>
        );
    }
}

export default Detail;