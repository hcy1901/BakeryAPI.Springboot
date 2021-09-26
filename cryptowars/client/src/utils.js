export class UserRaidenApi {
    constructor(axios, ip, token, target) {
        this.axios = axios;
        this.ip = ip;
        this.token = token;
        this.target = target;
    }

    pay(payload) {
        const api = `${this.ip}/api/v1/payments/${this.token}/${this.target}`;
        console.log('pay', api, payload);
        return this.axios.post(api, payload);
    }

    history(fromBlock=0) {
        const api =  `${this.ip}/api/v1/events/channels/${this.token}/${this.target}?from_block=${fromBlock}`;
        console.log('history', api);
        return this.axios.g