import ScrollReveal from 'scrollreveal'

const isSSR = typeof window === 'undefined'

// Use `ReturnType<typeof ScrollReveal>` to infer the correct type
const sr: ReturnType<typeof ScrollReveal> | null = isSSR ? null : ScrollReveal()

export default sr
