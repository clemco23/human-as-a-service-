import Button from "../atoms/button";

export default function Header() {
  return (
    <header className="bg-white text-black" >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Human as a Service</h1>
        </div>
        
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black">
            </button>
        </div>
          <Button color="black" size="medium">
            Acceuil
          </Button>
          <Button color="black" size="medium">
            Chat disponible
          </Button>
          <Button color="black" size="medium">
            À propos
          </Button>
          <Button color="black" size="medium">
            Contact
          </Button>
          <Button size="medium">
            Cat Connect
          </Button>
        </nav>
      </div>
    </header>
  );
}