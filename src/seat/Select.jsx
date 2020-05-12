import React, {Component} from 'react';
import {data} from './mock/data.json';


const SET_WIDTH = 50;
const SET_HEIGHT = 50;

const CANVAS_WIDTH = data[data.length - 1].x * SET_WIDTH;
const CANVAS_HEIGHT = data[data.length - 1].y * SET_HEIGHT;

class Select extends Component {

    componentDidMount() {
        //1. 成功加载3张图片
        this.ctx = this.refs.canvas.getContext('2d');
        //获取canvas对象

        const emptyImg = new Image();
        const selectImg = new Image();
        const soldImg = new Image();

        let count = 0;
        const loadCallback = () => {
            count++;
            if (count == 3) {
                this.emptyImg = emptyImg;
                this.selectImg = selectImg;
                this.soldImg = soldImg;
                this.drawAllImage();
            }
        }

        emptyImg.onload = loadCallback;
        selectImg.onload = loadCallback;
        soldImg.onload = loadCallback;

        emptyImg.src = './empty.png';
        selectImg.src = './select.jpg';
        soldImg.src = './sold.jpg';

    }

    componentDidUpdate() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.drawAllImage();
        this.drawSelectImage();

    }

    //用户当前选择的座位
    drawSelectImage = () => {

        let selected = this.props.selectSeat;
        selected.forEach((item, index) => {

            const {isSold, x, y} = item;
            const offsetLeft = (x - 1) * SET_WIDTH;
            const offsetTop = (y - 1) * SET_HEIGHT;
            this.ctx.drawImage(this.selectImg, offsetLeft, offsetTop, SET_WIDTH, SET_HEIGHT);

        })

    }
    drawAllImage = () => {
        //2. 渲染图片
        const seatData = data;

        seatData.forEach((item, index) => {

            const {isSold, x, y} = item;
            const offsetLeft = (x - 1) * SET_WIDTH;
            const offsetTop = (y - 1) * SET_HEIGHT;
            if (isSold) {
                this.ctx.drawImage(this.soldImg, offsetLeft, offsetTop, SET_WIDTH, SET_HEIGHT);
            } else {
                this.ctx.drawImage(this.emptyImg, offsetLeft, offsetTop, SET_WIDTH, SET_HEIGHT);
            }

        })

    }
    clickSeat = (e) => {

        //1. 获取canvas距离边界的位置
        let offset = this.refs.canvas.getBoundingClientRect()

        //2. 获取当前鼠标的位置
        let pageX = e.pageX - offset.left;
        let pageY = e.pageY - offset.top;

        let xPos = Math.ceil(pageX / SET_WIDTH);
        let yPos = Math.ceil(pageY / SET_HEIGHT);

        //3. 获取点击到的对象，  根据x和y和data中的x和y对比
        let seat = data.find(item => item.x === xPos && item.y === yPos);
        //4. 已经被选的座位不可以进行任何操作
        if (seat === undefined || seat.isSold) {
            return;
        }
        //5. 查找当前点击的数据库在数组中是否存在
        const selectIndex = this.props.selectSeat.findIndex(item => item.id == seat.id);

        if (selectIndex > -1) {
            //5.1 IF in the list 【DELETE】
            this.props.onRemove(seat.id);
        } else {
            //5.2 IF NOT IN THE LIST  【ADD】
            if (this.props.selectSeat.length >= 6) {
                alert("Max 6 tickets per order!");
            } else {
                this.props.onAdd(seat);
            }
        }

    }

    render() {
        return (
            <canvas ref='canvas' onClick={this.clickSeat} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
        );
    }
}

export default Select;
