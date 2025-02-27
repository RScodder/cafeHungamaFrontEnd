import React from "react";
import "./ClientDetail.css";
import { Card, Table, Row, Col, Modal, Icon, Button } from "antd";
import Venue from "./Venue";
import AddVenue from './AddVenue';
import axios from 'axios';
import AddTransaction from "./AddTransaction";

const columns = [
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date"
  },
  {
    title: "Pending Dues",
    dataIndex: "PendingDues",
    key: "Pending Dues"
  },
  {
    title: "Payment Done",
    dataIndex: "PaymentDone",
    key: "Payment Done"
  }
];
const bankcolumns = [
  {
    title: "IFSC Code",
    dataIndex: "ifsc",
    key: "ifsc"
  },
  {
    title: "Bank Name",
    dataIndex: "bank",
    key: "bank"
  },
  {
    title: "Account Number",
    dataIndex: "account_no",
    key: "account_no"
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch"
  },
]
const data = [
  {
    key: "1",
    Date: "9/01/2019",
    PendingDues: "1000",
    PaymentDone: "2000"
  }
];

class ClientDetail extends React.Component {
  state = {
    ifsc: "",
    bankname: "",
    branch: "",
    Accountno: "",
    visible1: false,
    visible2: false,
    data: [],
    profile:[],
    bankdetails:[],
    loading:true
  };
  
  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };
  showModal2 = () => {
    this.setState({
      visible2: true
    });
  };

  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };
  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };
  componentDidMount(){
    axios.get(
    `https://cafehungama.herokuapp.com/client/5d368a7f4a915e2c58f34952/profile`
    ).then(res => {
      this.setState({ profile: res.data})
    });
    axios.get(
      `https://cafehungama.herokuapp.com/client/5d368a7f4a915e2c58f34952/bankdetails`
    ).then(res=>{
      this.setState({ bankdetails: res.data, loading: false})
    });
  }
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };
  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };
  onSubmit = (props) => {
    console.log(props);
    axios.post(
      `https://cafehungama.herokuapp.com/client/5d09067224036b46e40f8d30/venues`, props[0]
    ).then(function (response) {
      console.log(response);
      console.log(response.data);
    })
    this.setState({
      visible1: false
    });

  }
  render() {
    return (
      <div>
        <div>
          <h3>
            Client ID : {this.state.profile._id} &nbsp;&nbsp; Client Name :{this.state.profile.firstName}
           &nbsp; &nbsp; Contact : {this.state.profile.contact}
          </h3>
        </div>
        &nbsp;
        <div>
          <Card title="Account Details" style={{ width: 600 }}>
            <Table columns={bankcolumns} dataSource={this.state.bankdetails} pagination={false} loading={this.state.loading} />
          </Card>
        </div>
        &nbsp;
        <div>
          <Row>
            <Col span={12}>
              <Card title="Venues" style={{ width: 600 }}>
                <Venue />
              </Card>
            </Col>
            <Col span={3}>
              <button class="button" onClick={this.showModal1}>
                <Icon type="home" />
                Add new Venue
            </button>

              <Modal
                title="Add Venue"
                visible={this.state.visible1}
                onOk={this.handleOk1}
                onCancel={this.handleCancel1}
              >
                <AddVenue onSubmit={this.onSubmit} />
              </Modal>
            </Col>
          </Row>
          
          
        </div>
        &nbsp;
        <div>
          <Card title="Transaction Details" style={{ width: 900 }}>
            <div>
              <Button type="primary" onClick={this.showModal2}>
                Add Transaction
              </Button>
              <Modal
                title="Add Payment"
                visible={this.state.visible2}
                onOk={this.handleOk2}
                onCancel={this.handleCancel2}
              >
                <AddTransaction clientid="456TYHUI876" pendingdues="5000" />
              </Modal>
            </div>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </div>
        <div />
      </div>
    );
  }
}
export default ClientDetail;
