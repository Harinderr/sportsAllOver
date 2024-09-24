import Saved from "@/components/sidebar";

export default async function RootLayout({children}){
    return (
        <main className="w-full h-screen flex flex-row">
             <Saved></Saved>
            {children}
        </main>
    )
}