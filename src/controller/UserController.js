import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async createUser(req, res) {

    try {
      const { name, email } = req.body

      let user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        return res.json({ error: "Já existe usuário com esse email" })
      }

      user = await prisma.user.create({
        data: {
          name,
          email
        }
      })

      return res.json(user)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany()
      return res.json(users)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({
        where: { id: Number(id) }
      })

      if (!user) return res.json({ error: "Não foram encontrados usuários com esse ID!" })

      return res.json(user)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name, email } = req.body

      let user = await prisma.user.findUnique({
        where: { id: Number(id) }
      })

      if (!user) return res.json({ error: "Não foram encontrados usuários com esse ID!" })

      user = await prisma.user.update(
        {
          where: { id: Number(id) },
          data: { name, email }
        })

      return res.json(user);
    } catch (error) {
      res.json({ error })
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params

      const user = await prisma.user.findUnique({
        where: { id: Number(id) }
      })

      if (!user) return res.json({ error: "Não foram encontrados usuários com esse ID!" })

      await prisma.user.delete({ where: { id: Number(id) } })

      return res.json({ message: "Usuário deletado!" })

    } catch (error) {
      return res.json({ error })

    }
  },

}