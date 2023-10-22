import axios from '../utils/axios';

export default {
  adminSignin: (data: object) => axios.post('/admin/signin', data),
  adminSignUp: (data: object) => axios.post('admin/signup', data)
}