import Button from "../components/atoms/button"

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl text-blue-500 mb-4">Home</h1>
            <Button size="large" color="primary" href="https://google.com">Google</Button>

        </div>
    )
}