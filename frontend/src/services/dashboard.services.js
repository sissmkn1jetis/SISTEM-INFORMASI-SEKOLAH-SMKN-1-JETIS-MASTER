import api from './api';

class DashboardService {
    getTotal() {
        return api.get('/dashboard');
    }
    getTotalNilai() {
        return api.get('/dashboardNilai');
    }
    getTotalSiswaByWalas() {
        return api.get('/dashboardSiswaWalas');
    }
}

export default new DashboardService();