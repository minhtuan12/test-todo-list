import './App.css'
import {Empty, Flex, message, Select, Spin} from "antd";
import {PlusOutlined, UnorderedListOutlined} from "@ant-design/icons";
import DefaultInput from "./components/DefaultInput/DefaultInput.tsx";
import {type ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import TodoItem from "./components/TodoItem/TodoItem.tsx";
import {type RootState} from "./states/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {addTask, setStatusFiltered, setTodoList} from "./states/modules/app.ts";
import {type ITodoItem, TaskStatus} from "./types";
import {statusOptions} from "./utils/constants.ts";

function App() {
    const [messageApi, contextHolder] = message.useMessage()
    const [newTask, setNewTask] = useState<string>("");
    const todoList: ITodoItem[] = useSelector((state: RootState) => state.app.todoList)
    const statusFiltered: number = useSelector((state: RootState) => state.app.statusFiltered)
    const isInitialized = useRef(false);
    const dispatch = useDispatch();

    const filteredList = useMemo(() => {
        return statusFiltered === -1 ? todoList : todoList.filter((task: ITodoItem) => task.status === statusFiltered)
    }, [statusFiltered, todoList])

    const handleAddNewTask = () => {
        if (newTask?.trim()) {
            dispatch(addTask({
                id: todoList.length + 1,
                title: newTask.trim(),
                status: TaskStatus.Open
            }))
            setNewTask("")
            messageApi.success('Add new task successfully.')
        }
    }

    useEffect(() => {
        dispatch(setTodoList(JSON.parse(localStorage.getItem("todoList") || '[]')))
        isInitialized.current = true;
    }, [dispatch]);

    useEffect(() => {
        if (!isInitialized.current) return;
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <>
            {contextHolder}
            <div
                className={'min-h-screen w-[99vw] px-5 py-[30px] border border-black border-solid shadow-sm bg-[#fff] border-sm'}>
                <Flex gap={10} align={"center"} justify={"center"}
                      className={'w-full text-[#000] font-[500] text-[24px]'}>
                    Todo List <UnorderedListOutlined/>
                </Flex>
                <Flex justify={"center"} className={'w-full xl:flex-row md:flex-col md:gap-2 xl:gap-[50px]'} align={"center"}>
                    <Flex align={"center"} className={'relative mt-[15px] w-1/2'}>
                        <DefaultInput
                            classname={'text-[18px]'}
                            placeholder={'Add your task'} value={newTask}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                            onPressEnter={handleAddNewTask}
                        />
                        <div
                            className={'cursor-pointer absolute right-[-3px] top-1/2 transform -translate-y-1/2 w-[40px] h-[40px] rounded-[50%]'}>
                            <PlusOutlined
                                onClick={handleAddNewTask}
                                className={'flex items-center justify-center text-[16px] h-[40px] w-[40px] bg-[#1677ff] text-[#fff] hover:bg-[#fff] hover:text-[#1677ff] hover:border-[#1677ff] hover:border hover:border-solid rounded-[50%]'}/>
                        </div>
                    </Flex>
                    <Select
                        onChange={(value: number) => {
                            dispatch(setStatusFiltered(value))
                        }}
                        value={statusFiltered}
                        options={[{
                            label: 'Filter by Status (All)',
                            value: -1
                        }, ...statusOptions]}
                        className={'xl:w-1/5 md:w-1/2 h-[38px] mt-[14px]'}
                        placeholder={'Filter by Status'}
                    />
                </Flex>
                <div className={`grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-[16px] mt-[50px]`}>
                    {
                        isInitialized.current ? filteredList.length > 0 ? filteredList.map(item => <TodoItem
                                    messageApi={messageApi} key={item.id} item={item}/>) :
                                <Empty className={'absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2'}
                                       image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                            <Spin className={'absolute top-1/2 transform -translate-y-1/2  left-1/2 -translate-x-1/2'}/>
                    }
                </div>
            </div>
        </>
    )
}

export default App
