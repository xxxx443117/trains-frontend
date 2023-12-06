import { Http } from '../http';

export class HelloApi extends Http {
  // hello
  async getHelloMsg(): Promise<Api.Response<Api.Hello.Msg>> {
    return this.get(`/hello`);
  }

  // hello
  async setHelloMsg(msg: string): Promise<Api.Response<Api.Hello.Msg>> {
    return this.post(`/hello/getHelloMsg`, { msg });
  }
}
