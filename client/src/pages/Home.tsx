// Home page and container for the app
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/threat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Table,
  Tag,
  Space,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Typography,
  Row,
  Col
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import tagColor from './tagColor';
const { Title } = Typography;

interface RecipeProps {
  history?: any;
  listStore?: any;
  match?: any;
  loadList: any;
  resetList: any;
}

class Home extends Component<RecipeProps> {
  state = {
    pagination: {
      current: 1,
      pageSize: 5,
    },
    visible: false,
    drawerTitle: 'NEW',
    formValue: {
      id: null,
      title: null,
      classification: null,
      impact: null,
      likelihood: null
    }
  };

  columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
    },
    {
      title: 'Impact',
      dataIndex: 'impact',
    },
    {
      title: 'Likelihood',
      dataIndex: 'likelihood',
    },
    {
      title: 'Risk',
      dataIndex: 'risk',
      render: (tag: any) => (
        <Tag color={(tagColor as any)[tag]} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="dashed" shape="circle" icon={<EditOutlined />} onClick={()=>this.open(true, record)} />
          <Button type="dashed" shape="circle" icon={<DeleteOutlined />} onClick={()=>this.onDelete(record.id)}/>
        </Space>
      ),
    },
  ];

  componentDidMount() {
    (this.props as any).loadThreats({pagination: this.state.pagination})
  }

  onClose = () => {
    this.setState({
      visible:false,
      drawerTitle: 'NEW',
      formValue: {
        id: null,
        title: null,
        classification: null,
        impact: null,
        likelihood: null
      }
    })
  }

  open = (isEdit: Boolean=false, record: any= null) => {
    this.setState({visible:true})
    if(isEdit){
      this.setState({drawerTitle:'EDIT', formValue: record})
    }
  }

  onFieldChange = (name: string, value: any) => {
    const formValue: any = {...this.state.formValue}
    formValue[name] = value;
    this.setState({formValue})
  }

  onSubmit = () => {
    const formValue: any = {...this.state.formValue};
    if (this.state.drawerTitle === 'NEW'){
      (this.props as any).createThreat(formValue);
    } else {
      (this.props as any).updateThreat(formValue);
    }
    this.onClose();
  }

  onDelete = (id: string) => {
    (this.props as any).deleteThreat({id})
  }

  onChange = (pagination: any) => {
    this.setState({pagination});
    (this.props as any).loadThreats({pagination})
  }

  renderForm = (loadingDeleteThreat: boolean,loadingUpdateThreat: boolean) => {
    const formValue: any = {...this.state.formValue}
    return <Form
      layout="horizontal"
    >
      <Form.Item>
          <Input
            placeholder="Title"
            onChange={(e)=>this.onFieldChange('title',e.target.value)}
            value={formValue.title}
          />
      </Form.Item>
      <Form.Item>
          <Input
            placeholder="Classification"
            onChange={(e)=>this.onFieldChange('classification',e.target.value)}
            value={formValue.classification}
          />
      </Form.Item>
      <Form.Item>
          <InputNumber 
            max={3}
            min={0}
            placeholder="Impact"
            style={{ width: '100%' }}
            onChange={(value)=>this.onFieldChange('impact',value)}
            value={formValue.impact}
          />
      </Form.Item>
      <Form.Item>
      <InputNumber 
            max={3}
            min={0}
            placeholder="Likelihood"
            style={{ width: '100%' }}
            onChange={(value)=>this.onFieldChange('likelihood',value)}
            value={formValue.likelihood}
          />
      </Form.Item>
      <Form.Item>
        <Button disabled={(loadingDeleteThreat||loadingUpdateThreat)} onClick={this.onSubmit}>Save</Button>
      </Form.Item>
    </Form>
  }

  render() {
    const { pagination, visible, drawerTitle } = this.state;
    const data = this.props.listStore.threats;
    const {
      loadingThreatsFetch,
      loadingCreateThreat,
      loadingDeleteThreat,
      loadingUpdateThreat } = this.props.listStore;
    (pagination as any).total = this.props.listStore.total;
    return (
      <Row>
        <Col flex="auto">
        <ToastContainer/>
        <Title level={3} style={{display: 'inline-block', marginRight: 5}}>Add new threat: </Title>
        <Button disabled={loadingCreateThreat} type="dashed" shape="circle" icon={<PlusCircleOutlined />} onClick={()=>this.open()} />
        <Drawer
          title={drawerTitle}
          width='20%'
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          {this.renderForm(loadingDeleteThreat,loadingUpdateThreat)}
        </Drawer>
        <Table
          columns={this.columns}
          dataSource={data}
          rowKey={record => record.id}
          pagination={{...pagination, }}
          loading={loadingThreatsFetch}
          onChange={this.onChange}
        />
        </Col>
      </Row>
    );
  }
}

const dispatchProps = {
  loadThreats: actions.loadThreats,
  createThreat: actions.createThreat,
  deleteThreat: actions.deleteThreat,
  updateThreat: actions.updateThreat,
};

const mapStateToProps = (state: any) => {
  const { listStore } = state;
  return { listStore };
};

export default connect(mapStateToProps, dispatchProps)(Home);
