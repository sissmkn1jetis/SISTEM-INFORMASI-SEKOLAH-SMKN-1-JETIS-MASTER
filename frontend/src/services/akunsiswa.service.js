import api from './api';

class AkunSiswaService {
    getAkunSiswa() {
        return api.get('/test/akunsiswa');
    }
    getByIdAkunSiswa(id) {
        return api.get(`/test/akunsiswa/${id}`);
    }
    createAkunSiswa(data) {
        return api.post("/test/akunsiswa", data);
    }
    updateAkunSiswa(id, data) {
        return api.patch(`/test/akunsiswa/${id}`, data);
    }
    deleteAkunSiswa(id) {
        return api.delete(`/test/akunsiswa/${id}`);
    }
}

export default new AkunSiswaService();