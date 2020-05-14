import React, {Component} from 'react';
import {data} from './mock/data.json';


const SET_WIDTH = 50;
const SET_HEIGHT = 50;

const CANVAS_WIDTH = data[data.length - 1].x * SET_WIDTH;
const CANVAS_HEIGHT = data[data.length - 1].y * SET_HEIGHT;

class Select extends Component {

    componentDidMount() {
        //1. LOAD 3 pics
        this.ctx = this.refs.canvas.getContext('2d');
        //GET canvas object

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

    //SELECT current seat
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
        //2. render pic
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

        //1. get canvas distance between borders
        let offset = this.refs.canvas.getBoundingClientRect()

        //2.get current cursor position
        let pageX = e.pageX - offset.left;
        let pageY = e.pageY - offset.top;

        let xPos = Math.ceil(pageX / SET_WIDTH);
        let yPos = Math.ceil(pageY / SET_HEIGHT);

        //3. get current clicked position，  compare x,y with teh x y in data
        let seat = data.find(item => item.x === xPos && item.y === yPos);
        //4. If seat us chosen, do nothinh
        if (seat === undefined || seat.isSold) {
            return;
        }
        //5. find if the data selected is in the data
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
