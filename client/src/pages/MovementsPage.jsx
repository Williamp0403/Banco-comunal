import { Fade } from "@mui/material";

export function MovementsPage () {
  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto ">
        <section className="p-8 sm:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">Movimientos</h1> 
        </section>
      </main>
    </Fade>
  )
}