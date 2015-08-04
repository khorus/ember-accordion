export default function() {
  this.transition(
    this.childOf('.AccordionPanel'),
    this.use('crossFade', {duration: 2000} ),
    this.reverse('toUp', {duration: 2000} )
  );
}
