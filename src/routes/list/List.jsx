import React, {Component, PureComponent} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {inject, observer} from "mobx-react";
// import CSSModules from 'react-css-modules';
import styles from './list.less';

@inject('listStore')
@observer
class List extends Component {
    state = {
        lists: [{
            id: '1',
            url: "https://gw.alicdn.com/mt/TB1Ey5WSXXXXXcJXVXXXXXXXXXX-188-246.png",
            alt: "品牌清仓"
        }, {
            id: '2',
            url: "https://gw.alicdn.com/mt/TB1FuvcSXXXXXaCXFXXXXXXXXXX-187-246.png",
            alt: "量贩优选"
        }, {
            id: '3',
            url: "https://gw.alicdn.com/mt/TB1eDK5SXXXXXXgXVXXXXXXXXXX-188-246.png",
            alt: "中国质造"
        }, {
            id: '4',
            url: "https://gw.alicdn.com/mt/TB16RKLSXXXXXb5aXXXXXXXXXXX-187-246.png",
            alt: "聚名品"
        }]

    };

    render() {
        const {listStore} = this.props;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <Icon key="1" type="ellipsis"/>,
                    ]}
                >NavBar{listStore.number}</NavBar>
                <div className={styles.border1px}></div>
                <div className={styles.flexContainer}>
                    {
                        this.state.lists.map((list, index) => {
                            return <Item url={list.url} alt={list.alt} key={index}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default List;
//export default CSSModules(List, styles);

class Item extends PureComponent {
    static defaultProps = {
        url: '',
        alt: ''
    };

    render() {
        return (
            <div className="aspectratio w-188-246">
                <div className="aspectratio-content">
                    <img src={this.props.url} alt={this.props.alt} width="100%"
                         height="100%"/>
                </div>
            </div>
        )
    }
}