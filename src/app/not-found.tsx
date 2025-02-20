import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-screen bg-[#09090B] flex items-center justify-center">
            <div className="w-[500px] h-auto rounded-lg shadow-md border-2 border-gray-dark p-6 text-white flex flex-col justify-center">

                <h1 className="my-4 font-bold text-center text-2xl">404</h1>
                <p className="text-center italic ont-semibold">Página não encontrada</p>

                <Link href="/" className="mt-12 w-full text-center font-bold duration-200 hover:underline">Voltar para a página principal</Link>
            </div>
        </div>
    )
}