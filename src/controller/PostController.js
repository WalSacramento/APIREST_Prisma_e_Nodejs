import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {
  async createPost(req, res) {
    const { content } = req.body
    const { id } = req.params

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } })

      if (!user) {
        return res.json({ message: "Não foram encontrados usuários com esse ID!" })
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id,
        },
        include: {
          author: true,
        },
      })
      return res.json(post)
    }
    catch (error) {
      return res.json({ message: error.message })
    }
  },

  async FindAllPosts(req, res) {
    try {
      const posts = await prisma.post.findMany({
        select: {
          content: true,
          id: true,
          author: {
            select: {
              name: true,
            }
          }
        }
      })

      return res.json(posts)
    } catch (error) {
      return res.json({ error })
    }
  },

  async UpdatePost(req, res) {
    const { id } = req.params
    const { content } = req.body

    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } })

      if (!post) {
        return res.json({ message: "Não foram encontrados posts com esse ID!" })
      }

      await prisma.post.update({
        where: { id: Number(id) },
        data: { content }
      })

      return res.json({ message: "Post Atualizado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  },

  async DeletePost(req, res) {
    const { id } = req.params

    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } })

      if (!post) {
        return res.json({ message: "Não foram encontrados posts com esse ID!" })
      }

      await prisma.post.delete({ where: { id: Number(id) } })

      return res.json({ message: "Post deletado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  }

}