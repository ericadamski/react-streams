const text = new Date().toString()

describe("Todos", () => {
  beforeEach(() => {
    cy.command("launch", "todos")
  })

  it("should add a todo", () => {
    cy.get('input[type="text"]').type(text)
    cy.get('input[type="submit"]').click()
    cy.wait("@post")
    cy.get("li:last-child > span").should("have.text", text)
  })

  it("should delete a todo", () => {
    cy.get("li:last-child > button:last-child").click()
    cy.wait("@delete")
    cy.get("li:last-child > span").should("not.have.text", text)
  })

  it("should toggle a todo", () => {
    cy
      .get("li:last-child > span")
      .should("have.css", "text-decoration-line", "none")

    cy.get("li:last-child > button:first").click()
    cy.wait("@patch")
    cy
      .get("li:last-child > span")
      .should("have.css", "text-decoration-line", "line-through")

    cy.get("li:last-child > button:first").click()
    cy.wait("@patch")
    cy
      .get("li:last-child > span")
      .should("have.css", "text-decoration-line", "none")
  })
})
