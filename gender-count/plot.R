library(ggplot2)
library(waffle)

png("graph.png", width = 800, height = 800, units = 'px', res=200)
 
tax_count <- c(Masculino = 85, Feminino = 15)

waffle(tax_count, rows=10, size=0.5, colors=c("#ff9900", "#cc0000"), xlab="1 quadrado equivale a 5,13 deputados.")

# colors=c("#cc0000", "#ff9900", "#ff6699", "#6699ff", "#006666", "#33cc33")
