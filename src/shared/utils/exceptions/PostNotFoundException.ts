import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {
    constructor(id: string, query?: any) {
        const message = query ? `Busca com query ${JSON.stringify(query)}` : `Busca com identificador ${id}`;
        super(404, `${message} não encontrou resultados`);
    }
}

export default PostNotFoundException;
