
import Vue from 'vue';
import { Button,Input,FormItem,Form,Message,Header,Container,Main,Aside,Menu,MenuItem
    ,Submenu,Avatar,Breadcrumb,BreadcrumbItem,Row,Col,Card,Table,TableColumn,Backtop
    ,Footer,Dropdown,DropdownMenu,DropdownItem,Dialog,InputNumber,Upload,ButtonGroup,MessageBox,Divider,Loading } from 'element-ui';

Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Backtop)
Vue.use(Footer)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Dialog)
Vue.use(InputNumber)
Vue.use(Upload)
Vue.use(ButtonGroup)
Vue.use(Divider)
Vue.prototype.$loading=Loading.service;
Vue.prototype.$message=Message
Vue.prototype.$msgbox=MessageBox
