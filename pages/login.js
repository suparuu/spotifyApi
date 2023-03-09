
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonToolbar, Container, FormControl, InputGroup } from "react-bootstrap";

export default function Login() {
    return(
        <>
        <Container>
            <InputGroup className="mb-3" size="lg">
            <FormControl placeholder="아이디" type="input"></FormControl>
            <FormControl placeholder="비밀번호" type="input"></FormControl>
            <FormControl placeholder="이메일주소" type="input"></FormControl>
            <Button>회원가입</Button>
            </InputGroup>
        </Container>
        </>

    )
}