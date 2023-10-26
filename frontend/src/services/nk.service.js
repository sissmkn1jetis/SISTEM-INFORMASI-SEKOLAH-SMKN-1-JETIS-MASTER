import api from './api';

class NKService {
    getNK() {
        return api.get('/test/listnk');
    }
    getNKById(id) {
        return api.get(`/test/listnk/${id}`);
    }
    createNK(siswaId, data) {
        return api.post(`/test/listnk/${siswaId}`, data);
    }
    updateNK(id, data) {
        return api.patch(`/test/listnk/${id}`, data);
    }
    deleteNK(id) {
        return api.delete(`/test/listnk/${id}`);
    }
}

export default new NKService();