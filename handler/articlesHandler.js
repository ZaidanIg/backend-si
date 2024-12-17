const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

const addArticleHandler = async (request, h) => {
    if (!request.auth.credentials) {
        return h.response({ error: 'Unauthorized' }).code(401);
    }
    const { title, content } = request.payload;

    try {
        const slug = slugify(title, { lower: true, strict: true });
        const newArticle = await prisma.article.create({
        data: { title, content, slug },
        });
        return h.response({
            message: 'successfully to create article',
            data: newArticle
        }).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to create article' }).code(500);
    }
};

const getAllArticlesHandler = async (request, h) => {
    try {
        const articles = await prisma.article.findMany();
        return h.response({
            data: articles,
        }).code(200);
    } catch (error) {
        return h.response({ error: 'Failed to retrieve articles' }).code(500);
    }
};

const getArticleByIdHandler = async (request, h) => {
    const { id } = request.params;
    try {
        const article = await prisma.article.findUnique({ where: { id: parseInt(id, 10) } });
        return article
        ? h.response(article).code(200)
        : h.response({ error: 'Article not found' }).code(404);
    } catch (error) {
        return h.response({ error: 'Failed to retrieve article' }).code(500);
    }
};

const updateArticleHandler = async (request, h) => {
    const { id } = request.params;
    const { title, content } = request.payload;

    try {
        const slug = slugify(title, { lower: true, strict: true });
        const updatedArticle = await prisma.article.update({
        where: { id: parseInt(id, 10) },
        data: { title, content, slug },
        });
        return h.response({
            message: 'Successfully to update article',
            data: updatedArticle
        }).code(200);
    } catch (error) {
        return h.response({ error: 'Failed to update article' }).code(500);
    }
};


const deleteArticleHandler = async (request, h) => {
    const { id } = request.params;
    try {
        await prisma.article.delete({ where: { id: parseInt(id, 10) } });
        return h.response({ message: 'Article deleted successfully' }).code(200);
    } catch (error) {
        return h.response({ error: 'Failed to delete article' }).code(500);
    }
};

module.exports = {
    addArticleHandler,
    getAllArticlesHandler,
    getArticleByIdHandler,
    updateArticleHandler,
    deleteArticleHandler,
};
