import { http } from "@/services/http";

export default {
    state: {
        cities: JSON.parse(localStorage.getItem('cities')) || [],
        defaultCity:  JSON.parse(localStorage.getItem('default_city')) || null,
        activeCity: null
    },
    mutations: {
        setCities(state, data) {
            const city = state.cities && state.cities.find(item => item.name === data.name);
            const cityInfo = {
                lon: data.coord.lon,
                lat: data.coord.lat,
                name: data.name
            }


            if (!city) {
               !state.cities.length ? state.cities.unshift(cityInfo) : state.cities.splice(1, 0, cityInfo)
                this.commit('cities/setActiveCity', data);
                localStorage.setItem('cities', JSON.stringify(state.cities));
                if (state.cities.length === 1) {
                    this.commit('cities/setDefaultCity', state.cities[0]);
                }
                return;
            }

            this.commit('cities/setActiveCity', data);
        },
        setActiveCity(state, city) {
            state.activeCity = city;
        },
        setDefaultCity(state, defaultCity) {
            state.defaultCity = defaultCity;
            localStorage.setItem('default_city', JSON.stringify(defaultCity));
            state.cities = state.cities.filter(item => item.name !== defaultCity.name);
            state.cities.unshift(defaultCity);
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
        deleteCity(state, city) {
            if (state.defaultCity.name === city.name) {
                state.defaultCity = null;
                localStorage.removeItem('default_city');
            }
            if (state.activeCity.name === city.name) {
                state.activeCity = null;
            }
            state.cities = state.cities.filter(item => item.name !== city.name);
            localStorage.setItem('cities', JSON.stringify(state.cities));
        }
    },
    actions: {
        async getWeatherByCoords( { commit }, payload) {
            try {
                const data = await http.get(`weather?lat=${payload.latitude}&lon=${payload.longitude}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
                commit("setCities", data.data);
            } catch (e) {
                commit("setError", e.message, { root: true });
            }
        },
        async getWeatherCity({ commit }, query) {
            try {
                const data = await http.get(`weather?q=${query}&units=metric&appid=${process.env.VUE_APP_API_KEY}`);
                if (data.data.name) {
                    commit("setCities", data.data);
                    return true
                } else {
                    return false;
                }

            } catch (e) {
                commit("setError", e.message, { root: true });
            }
        },
    },
    getters: {
        cities(state) {
            return state.cities;
        },
        activeCity(state) {
            return state.activeCity;
        },
        defaultCity(state) {
            return state.defaultCity;
        }
    },
    namespaced: true,
};
