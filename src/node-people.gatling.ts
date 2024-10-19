import {
    simulation,
    scenario,
    exec,
    tsv,
    constantUsersPerSec,
    StringBody,
    rampUsersPerSec
} from "@gatling.io/core";
import { http, status, header } from "@gatling.io/http";

export default simulation((setUp) => {
    const httpProtocol = http
        .baseUrl("http://localhost:9999")
        .userAgentHeader("Agente do Caos - 2023");

    const criacaoEConsultaPessoas = scenario("Criação E Talvez Consulta de Pessoas")
        .feed(tsv("pessoas-payloads.tsv").circular())
        .exec(
            http("criação")
                .post("/pessoas")
                .body(StringBody("#{payload}"))
                .header("content-type", "application/json")
                .check(status().in(201, 422, 400))
                .check(status().saveAs("httpStatus"))
                .checkIf((session) => session.get("httpStatus") === "201")
                .then(
                    header("Location").saveAs("location")
                )
        )
        .pause(1, 30)
        .doIf(session => session.contains("location")).then(
            exec(
                http("consulta")
                    .get("#{location}")
            )
        )

    const buscaPessoas = scenario("Busca Válida de Pessoas")
        .feed(tsv("termos-busca.tsv").circular())
        .exec(
            http("busca válida")
                .get("/pessoas?t=#{t}")
                .check(status().in(200))
        )

    const buscaInvalidaPessoas = scenario("Busca Inválida de Pessoas")
        .exec(
            http("busca inválida")
                .get("/pessoas")
                .check(status().is(400))
        );

    setUp(
        criacaoEConsultaPessoas.injectOpen(
            constantUsersPerSec(2).during(10), // warm up
            constantUsersPerSec(5).during(15).randomized(), // are you ready?
            rampUsersPerSec(6).to(600).during(180) // Let's go!
        ),
        buscaPessoas.injectOpen(
            constantUsersPerSec(2).during(25), // warm up
            rampUsersPerSec(6).to(100).during(180) // Let's go!
        ),
        buscaInvalidaPessoas.injectOpen(
            constantUsersPerSec(2).during(25), // warm up
            rampUsersPerSec(6).to(40).during(180) // Let's go!
        )
    ).protocols(httpProtocol);
})
