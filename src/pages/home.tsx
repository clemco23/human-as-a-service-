import Button from "../components/atoms/button"
import Header from "../components/molecules/header"

export default function Home() {
    return (
        <div>
            <Header />
            <main className="p-8">
                <h1 className="text-3xl text-blue-500 mb-4">Home</h1>
                <Button size="large" color="primary" href="https://google.com">Google</Button>
            </main>
        </div>
    )
}