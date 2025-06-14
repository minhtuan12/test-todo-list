import {Checkbox, type CheckboxChangeEvent, Flex, Select, Tooltip} from "antd";
import {type ChangeEvent, memo, useEffect, useState} from "react";
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import {type ITodoItem, TaskStatus, type TaskStatusType} from "../../types";
import {setEditingItem, setTodoList} from "../../states/modules/app.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store.ts";
import DefaultInput from "../DefaultInput/DefaultInput.tsx";
import type {MessageInstance} from "antd/es/message/interface";
import {statusOptions} from "../../utils/constants.ts";

const TodoItem = memo(
    ({item, messageApi}: { item: ITodoItem, messageApi: MessageInstance }) => {
        const todoList = useSelector((state: RootState) => state.app.todoList)
        const editingItem = useSelector((state: RootState) => state.app.editingItem)
        const [editText, setEditText] = useState<string>("");
        const dispatch = useDispatch();
        const isTaskDone: boolean = item.status === TaskStatus.Done

        const handleDeleteTask = () => {
            dispatch(setTodoList(todoList.filter((task: ITodoItem) => task.id !== item.id)))
            messageApi.success('Task deleted.')
        }

        const handleEnableEdit = () => {
            dispatch(setEditingItem(item))
        }

        const handleMarkTaskDone = (isDone: boolean) => {
            dispatch(setTodoList(todoList.map((task: ITodoItem) => task.id !== item.id ? task : {
                ...task,
                status: isDone ? TaskStatus.Done : TaskStatus.Processing
            })))
        }

        const handleCancelEdit = () => {
            dispatch(setEditingItem(null))
            setEditText("")
        }

        const handleSubmitEdit = () => {
            if (editText?.trim()) {
                dispatch(setTodoList(todoList.map((task: ITodoItem) => task.id !== item.id ? task : {
                    ...task,
                    title: editText.trim()
                })))
                handleCancelEdit()
                messageApi.success("Task updated.")
            }
        }

        const handleChangeStatus = (status: TaskStatusType) => {
            dispatch(setTodoList(todoList.map((task: ITodoItem) => task.id !== item.id ? task : {
                ...task,
                status
            })))
        }

        useEffect(() => {
            if (editingItem) {
                setEditText(editingItem.title)
            }
        }, [editingItem]);

        if (editingItem && item.id === editingItem.id) {
            return <Flex
                className={'w-full p-[10px] min-h-[80px] border border-solid border-[#d9d9d9] rounded-[6px] px-[14px]'}
                vertical
                gap={10}
            >
                <Flex align={"center"} justify={"space-between"}>
                    <div className={'font-[500] text-left'}>Edit Task</div>
                    <Flex gap={12} justify={"center"}>
                        <CloseCircleOutlined className={'text-[20px] !text-[red] cursor-pointer'}
                                             onClick={handleCancelEdit}/>
                        <CheckCircleOutlined className={'text-[20px] !text-[green] cursor-pointer'}
                                             onClick={handleSubmitEdit}/>
                    </Flex>
                </Flex>
                <Flex gap={15} vertical>
                    <DefaultInput
                        onPressEnter={handleSubmitEdit} value={editText}
                        className={'rounded-[6px] h-[40px] flex-1'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                    />
                </Flex>
            </Flex>
        }

        return <Flex
            className={`relative p-[12px] min-h-[80px] ${isTaskDone ? 'bg-[#ebebeb]' : 'bg-[#fff]'} rounded-[6px] px-[14px] w-full border border-solid border-[#d9d9d9]`}
            vertical
            justify={"start"}
            gap={10}
        >
            <CloseOutlined className={'absolute right-[16px] text-[gray]'} onClick={handleDeleteTask}/>
            <Flex align={"center"} gap={12}>
                <Select options={statusOptions} className={'w-[110px] h-[28px]'} value={item.status}
                        onChange={(status: number) => handleChangeStatus(status as TaskStatusType)}/>
                {!isTaskDone ?
                    <EditOutlined className={'text-[16px]'} onClick={handleEnableEdit}/> : ''}
            </Flex>
            <Flex justify={'space-between'}>
                <Flex align={"start"} gap={8} className={'flex-1 max-w-[calc(100%-30px)]'}>
                    <Tooltip title={'Mark as done'}>
                        <Checkbox
                            checked={isTaskDone}
                            onChange={(e: CheckboxChangeEvent) => handleMarkTaskDone(e.target.checked)}
                        />
                    </Tooltip>
                    <Tooltip title={item.title} placement={'bottom'}>
                        <span
                            className={`h-full line-clamp-2 font-[500] text-left ${isTaskDone ? 'line-through text-[gray]' : ''} text-ellipsis overflow-hidden`}>{item.title}</span>
                    </Tooltip>
                </Flex>
            </Flex>
        </Flex>
    }
)

export default TodoItem
