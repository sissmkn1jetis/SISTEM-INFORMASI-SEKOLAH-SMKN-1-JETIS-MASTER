import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test/all');
  }

  getWalas() {
    return api.get('/test/walas');
  }

  getGuru() {
    return api.get('/test/guru');
  }

  getProfileAdmin() {
    return api.get('/auth/me/admin');
  }

  getProfileGuru() {
    return api.get('/auth/me/guru');
  }

  getProfileWalas() {
    return api.get('/auth/me/walas');
  }

  CetakPDFNK(data) {
    return api.post('/pdfnilaiketrampilan', data)
  }

  CetakPDFNP(data) {
    return api.post('/pdfnilaipengetahuan', data)
  }

  getCetakPDF() {
    return api.get('/pdfnilaiketrampilan')
  }

  getAdmin() {
    return api.get('/test/admin');
  }

  getKabeng() {
    return api.get('/test/kabeng');
  }

  getUser() {
    return api.get('/test/user/');
  }
  getUserById(id) {
    return api.get(`/test/user/${id}`);
  }
  createUser(data) {
    return api.post("/test/user/", data);
  }
  updateUser(id, data) {
    return api.put(`/test/user/${id}`, data);
  }
  deleteUser(id) {
    return api.delete(`/test/user/${id}`);
  }
}

export default new UserService();