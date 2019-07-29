import React from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Modal } from "antd";
import UserDetail from "./UserDetail";
import "./UserDetail.css";

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  state = {
    visible: false,
    editingKey: "",
    data: [],
    columns: [
      {
        title: "User Name",
        dataIndex: "userName",
        width: "10%",
        editable: false,
        key: "userName"
      },
      {
        title: " First Name",
        dataIndex: "firstName",
        width: "12%",
        editable: true,
        key: "name"
      },
      {
        title: " Last Name",
        dataIndex: "lastName",
        width: "12%",
        editable: true,
        key: "name"
      },
      {
        title: "Email Id",
        dataIndex: "email",
        width: "20%",
        editable: true
      },
      {
        title: "Contact No.",
        dataIndex: "contact",
        width: "15%",
        editable: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.id)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <button>Delete</button>
              </Popconfirm>
              &nbsp;&nbsp;
              <button
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.id)}
              >
                Edit
              </button>
              &nbsp;&nbsp;
              <button onClick={this.showModal}>View Details</button>
              <Modal
                title="Details"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <UserDetail detail={record} />
              </Modal>
            </span>
          );
        }
      }
    ]
  };

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.userid !== this.props.userid) {
      const data = this.props.userid[0];
      this.setState({
        data: data
      });
    }
  }

  isEditing = record => record.id === this.state.editingKey;

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  cancel = () => {
    this.setState({ editingKey: "" });
  };

  handleDelete = id => {
    const data = [...this.state.data];
    console.log(id);
    this.setState({ data: data.filter(item => item.id !== id) }); //change column name to unique key
  };

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(id) {
    this.setState({ editingKey: id });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "id" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          rowKey="userName"
          loading={this.props.loading}
          pagination={{
            onChange: this.cancel
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;
