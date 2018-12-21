import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {inject, observer} from "mobx-react";
import './list.less'

@inject('listStore')
@observer
class List extends Component {
    render() {
        const { listStore } = this.props;
        return (
            <div>
                <Button type="primary">List{listStore.number}</Button>
                <div className="test"></div>
            </div>
        );
    }
}

export default List;