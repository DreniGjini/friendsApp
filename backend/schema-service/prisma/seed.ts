import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding...');

  await prisma.user.createMany({
    data: [
      {
        name: 'James Wilson',
        email: 'jameswilson2024@example.com',
        username: 'JamesW2024',
        imgUrl:
          'https://images.pexels.com/photos/5102907/pexels-photo-5102907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Robert Johnson',
        email: 'robertjohnson2024@example.com',
        username: 'RobertJ2024',
        imgUrl:
          'https://images.pexels.com/photos/4947563/pexels-photo-4947563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'William Brown',
        email: 'williambrown2024@example.com',
        username: 'WilliamB2024',
        imgUrl:
          'https://images.pexels.com/photos/1370750/pexels-photo-1370750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Sophia Lee',
        email: 'sophialee2024@example.com',
        username: 'SophiaL2024',
        imgUrl:
          'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'David Taylor',
        email: 'davidtaylor2024@example.com',
        username: 'DavidT2024',
        imgUrl:
          'https://images.pexels.com/photos/2190377/pexels-photo-2190377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Richard Davis',
        email: 'richarddavis2024@example.com',
        username: 'RichardD2024',
        imgUrl:
          'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Emma White',
        email: 'emmawhite2024@example.com',
        username: 'EmmaW2024',
        imgUrl:
          'https://images.pexels.com/photos/3771639/pexels-photo-3771639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Joseph Martinez',
        email: 'josephmartinez2024@example.com',
        username: 'JosephM2024',
        imgUrl:
          'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        name: 'Emily Clark',
        email: 'emilyclark2024@example.com',
        username: 'EmilyC2024',
        imgUrl:
          'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      {
        name: 'Amina Yusuf',
        email: 'aminayusuf2024@example.com',
        username: 'AminaY2024',
        imgUrl:
          'https://images.pexels.com/photos/20683848/pexels-photo-20683848/free-photo-of-a-woman-by-the-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  });
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
