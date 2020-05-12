import React,{Component} from 'react';
import Select from './Select'
import './Details.css'
class Details extends Component {
	state = {
		selectSeat:[]
	}
	
	//添加操作
	addSeat = (seat)=>{
		this.setState(prevState=>({
			selectSeat:[...prevState.selectSeat,seat]
		}))
	}
	//删除操作
	removeSeat = (id)=>{	
		this.setState({
			selectSeat:this.state.selectSeat.filter(seat=>seat.id !== id)
		})
	}
	render() {
		const {selectSeat} =this.state;
		
		return (
			<div>
				<div className='select'>
					<Select selectSeat={selectSeat} onAdd={this.addSeat} onRemove={this.removeSeat}/>
				</div>
			</div>
		);
	}
}

export default Details;