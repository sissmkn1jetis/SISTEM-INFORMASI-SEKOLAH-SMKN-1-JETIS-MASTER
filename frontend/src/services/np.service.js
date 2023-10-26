import api from './api';

class NPService {
    getNP() {
        return api.get('/test/listnp');
    }
    getNPById(id) {
        return api.get(`/test/listnp/${id}`);
    }
    createNP(siswaId, data) {
        return api.post(`/test/listnp/${siswaId}`, data);
    }
    updateNP(id, data) {
        return api.patch(`/test/listnp/${id}`, data);
    }
    deleteNP(id) {
        return api.delete(`/test/listnp/${id}`);
    }
}

export default new NPService();