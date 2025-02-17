# To create Nest project

```Bash
nest new project-name
```

# To create new module

```Bash
nest generate module module-name
```

## in short form

```Bash
nest g m module-name
```

# To create new service

```Bash
nest generate service module-name
```

## in short form

```Bash
nest g service module-name
```

# To create new controller

```Bash
nest generate controller module-name
```

## in short form

```Bash
nest g controller module-name
```

# To create new guard

```Bash
nest generate guard guard-name
```

## in short form

```Bash
nest g guard guard-name
```

# To create new pipe

```Bash
nest generate pipe pipe-name
```

## in short form

```Bash
nest g pipe pipe-name
```

# To create all these resources at once

This command will create all the necessary files the module wants which are `DTO classes (create and update)`, `entity class`, `module file`, `controller with CRUD endpoints and the test spec`, `service and the test spec`

But all these are created when you choose a REST API and selected generate CRUD

```Bash
nest generate resource module-name
```

## in short form

```Bash
nest g resource module-name
```

# To run Test

```Bash
nest run test module.controller
nest run test module.service
```
