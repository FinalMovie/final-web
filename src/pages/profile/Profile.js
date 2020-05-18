import {withRouter} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Descriptions, Empty, Form, Input, notification, Space, Spin} from "antd";

const Profile = (props) => {

    const [info, setInfo] = useState({data: {}});
    const [loading, setLoading] = useState(false);

    const request = () => {
        setLoading(true);
        axios.get("/api/currentUser").then(res => {
            if (res.status === 200) {
                setInfo(res.data);
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        request();
    }, []);

    let infoList = [
        {key: 'username', name: 'UserName'},
        {key: 'email', name: 'Email'},
        {key: 'membership', name: 'Membership Points'},
        {key: 'role', name: 'Role'},
    ]

    const layout = {
        background: '#ffffff',
        labelCol: {span: 8},
        wrapperCol: {span: 8},
    };
    const tailLayout = {
        background: '#ffffff',
        wrapperCol: {offset: 8, span: 8},
    };

    const onFinish = values => {

        console.log(values);
        let formData = new FormData();
        formData.append("password", values.password);
        formData.append("new_password", values.new_password);
        axios.post("/api/changePwd", formData).then(res => {
            if (res.status === 200 && res.data.success) {
                notification['success']({
                    message: 'Success!',
                });
                axios.get("/api/logout").then(res => {
                    if (res.data.success) {
                    } else {
                    }
                })
                props.history.push("/Home");
            } else {
                notification['error']({
                    message: res.data.msg ? res.data.msg : 'Error',
                });
            }
        })
    };

    return (
        <Space direction={"vertical"}>
            <Spin size="large" spinning={loading}>
                {info.length !== {} ?
                    <Card title="Profile">
                        <Descriptions bordered={true}>
                            {infoList.map(e => {
                                return (<Descriptions.Item label={e.name} key={e.key}>{info[e.key]}</Descriptions.Item>);
                            })}
                        </Descriptions>
                    </Card>
                    :
                    <Empty/>
                }
            </Spin>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input old your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[{required: true, message: 'Please input your new password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Space>

    );
}

export default withRouter(Profile);
