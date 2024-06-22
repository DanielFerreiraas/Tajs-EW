import { describe, expect, it, jest } from "@jest/globals";
import Person from "../src/person";

describe("#Person Suite", () => {
  describe("#Validate", () => {
    it("should throw if the name is not present", () => {
      //mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw if the cpf is not present", () => {
      //mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: "Zezin da Silva",
        cpf: "",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not throw person is valid", () => {
      //mock é a entrada necessaria para que o teste funcione
      const mockInvalidPerson = {
        name: "Zezin da Silva",
        cpf: "123.456.789-00",
      };

      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    // parte do principio que os dados ja foram validados
    it("shold format the person name and CPF", () => {
      //AAA

      //Arrange = prepara
      const mockPerson = {
        name: "Xuxa da Silva",
        cpf: "000.999.444-11",
      };

      //Act = Executar
      const formattedPerson = Person.format(mockPerson);

      //Assert = Validar
      const expected = {
        name: "Xuxa",
        cpf: "00099944411",
        lastName: "da Silva",
      };

      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      const mockPerson = {
        name: "Zezin da Silva",
        cpf: "123.456.789--00",
      };
      jest.spyOn(Person, Person.validate.name).mockReturnValue();

      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: "12345678900",
        name: "Zezin",
        lastName: "da Silva",
      });

      const result = Person.process(mockPerson);

      const expected = "ok";
      expect(result).toStrictEqual(expected);
    });
  });
});
