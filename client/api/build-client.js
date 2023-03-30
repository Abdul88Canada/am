import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on a server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        // we are on a broswer
        return axios.create({
            baseURL: '/'
        });
    }
}