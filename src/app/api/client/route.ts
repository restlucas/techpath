import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type ClientProps = {
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
};

const PAGE_SIZE = 10;

async function getClients(page: number, search: string) {
  const filters = search
    ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      }
    : {};

  try {
    const clients = await prisma.client.findMany({
      where: filters,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        address: true,
        birth: true,
      }
    })

    const totalFilteredClients = await prisma.client.count({
      where: filters,
    })

    return NextResponse.json({
      type: "success",
      message: "Success on retrieve clients list",
      data: {
        clients,
        page,
        totalPages: Math.ceil(totalFilteredClients / PAGE_SIZE),
      },
      code: 202,
    });
  } catch (error) {
    console.log(error)
  }
  
}

async function getClient(clientId: string) {
  try {
    const client = await prisma.client.findFirst({
      where: {
        id: clientId
      },
      select: {
        name: true,
        phone: true,
        email: true,
        address: true,
        birth: true,
      }
    })

    return NextResponse.json({
      type: "success",
      message: "Success on fetch client data",
      data: client,
      code: 202,
    });
  } catch (error) {
    console.log(error)
  }
}

async function createClient(data: ClientProps) {
  try {
    const clientAlreadyInCreated = await prisma.client.findFirst({
      where: {
        email: data.email,
      },
    });

    if (clientAlreadyInCreated) {
      return NextResponse.json(
        {
          type: "error",
          message: "Cliente já está em nosso sistema",
          code: 409,
        },
        { status: 409 }
      );
    }

    await prisma.client.create({
      data: data,
    });

    return NextResponse.json(
      {
        type: "success",
        message: "Cliente criado com sucesso",
        code: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error ao criar cliente:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
        code: 500,
      },
      { status: 500 }
    );
  }
}

async function updateClient(clientId: string, data: ClientProps) {
  try {
    await prisma.client.update({
      where: {
        id: clientId
      },
      data: data,
    });

    return NextResponse.json(
      {
        type: "success",
        message: "Cliente editado com sucesso",
        code: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
        code: 500,
      },
      { status: 500 }
    );
  }
}

async function deleteClient(clientId: string[]){
  try {
    await prisma.client.deleteMany({
      where: {
        id: { in: clientId }
      }
    })

    return NextResponse.json(
      {
        type: "success",
        message: "Clientes deletados com sucesso",
        code: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao excluir clientes:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "Internal Server Error",
        code: 500,
      },
      { status: 500 }
    );
  }
}

// Handlers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action") as string;
  const clientId = searchParams.get("clientId") as string;
  const page = searchParams.get("page");
  const search = searchParams.get("search") as string;

  switch (action) {
    case "getClients":
      return await getClients(Number(page), search);
    case "getClient":
      return await getClient(clientId);
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action");

  switch (action) {
    case "createClient":
      const body = await request.json();
      return await createClient(body);
  }
}

export async function PUT(request: NextRequest){
  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action") as string;
  const clientId = searchParams.get("clientId") as string;


  switch (action) {
    case "updateClient":
      const body = await request.json();
      return await updateClient(clientId, body);

    default:
      return new Response(
        JSON.stringify({ error: 'Missing action or clientId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
        
  }
}

export async function DELETE(request: NextRequest){
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action') as string

  switch(action) {
    case 'deleteClient':
      const body = await request.json()
      return await deleteClient(body)

    default:
      return new Response(
        JSON.stringify({ error: 'Missing action or clientId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
  }

}