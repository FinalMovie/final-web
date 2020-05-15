import React, {useEffect, useState} from "react";
import {Layout, Menu} from "antd";
import {VideoCameraFilled} from '@ant-design/icons';
import {Link} from "react-router-dom";

const Header1 = () => {


    const [login, setLogin] = useState(false);


    useEffect(() => {
        let storage = window.localStorage;
        if (storage.getItem('current')) {
            setLogin(true);
        }
    }, []);

    const {Header, Sider} = Layout;

    return (
        <layout>
            <Header style={{background: '#ffffff', position: 'fixed', width: '100%', padding: 0}}>
                <Menu theme="light" mode="horizontal" style={{width: '80%'}}>
                    <Menu.Item key="1">
                        <Link to="/Home"><VideoCameraFilled style={{fontSize: '32px'}}/>TheLegend27
                        </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Movie">Movies</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/Food">Food</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/WhatNew">What's New</Link></Menu.Item>
                </Menu>
                <Menu theme="light" mode="horizontal" style={{width: '10%'}}>
                    <Menu.Item key="1">
                        <Link to="/Home"><VideoCameraFilled style={{fontSize: '32px'}}/>TheLegend27
                        </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Movie">Movies</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/Food">Food</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/WhatNew">What's New</Link></Menu.Item>
                </Menu>
            </Header>
        </layout>
    )
}

export default (Header1);