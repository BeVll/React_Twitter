import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {apiForm} from "../../../utils/axios.ts";
import {useFormik} from "formik";
import {ITweetCreate, IUploadImage, IUploadImageResult} from "../types.ts";
import * as Yup from "yup";
import {Button, DatePicker, Modal, ModalBody, ModalHeader, Textarea} from "@nextui-org/react";
import {CiImageOn} from "react-icons/ci";
const CreatePost = (props) => {
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    const [images, setImages] = useState<IUploadImageResult[]>([]);
    const [disableImages, setDisableImages] = useState<boolean>(false);
    const container = useRef<HTMLDivElement>(null);
    const btn = useRef<HTMLButtonElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        console.log(container);
        if (container.current && !container.current.contains(event.target as Node) && btn.current && !btn.current.contains(event.target as Node)) {
            // setShowEmoji(false);
        }
    }

    useEffect(() => {

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [container]);



    const setGrid = () => {
        console.log(images.length);
        switch (images.length) {
            case 0:
                setGridColumns("1fr");
                setGridRows("1fr");
                break;
            case 1:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 2:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 3:
                setGridColumns("1fr 1fr");
                setGridRows("1fr 1fr");
                break;
            default:
                break;
        }
    }

    const initValues: ITweetCreate = {
        tweetText: "sdaffffff",
        mediaIds: [],
        repostedId: null,
        postTime: new Date(),
        timeZone: "0"
    };

    const createSchema = Yup.object({

    });

    const onSubmitFormikData = (values: ITweetCreate) => {
        console.log("Values", values);
        if (values.postTime != null) {
            var now_utc = Date.UTC(values.postTime.getUTCFullYear(), values.postTime.getUTCMonth(),
                values.postTime.getUTCDate(), values.postTime.getUTCHours(),
                values.postTime.getUTCMinutes(), values.postTime.getUTCSeconds());
            formik.setFieldValue("postTime", now_utc);
        }
        console.log("Values", values);
        apiForm.post('tweets/createTweet', values)
            .then(resp => {
                if (resp.data == "Done") {
                    formik.resetForm();
                    setImages([]);
                    props.loadPosts();
                    // setDisableImages(false);
                }
            });



    }
    const isSeparator = (value: string): boolean => value === '/' || value === '\\' || value === ':';
    const getExtension = (path: string): string => {
        for (let i = path.length - 1; i > -1; --i) {
            const value = path[i];
            if (value === '.') {
                if (i > 1) {
                    if (isSeparator(path[i - 1])) {
                        return '';
                    }
                    return path.substring(i + 1);
                }
                return '';
            }
            if (isSeparator(value)) {
                return '';
            }
        }
        return '';
    };


    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });


    const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(disableImages);
        if (!disableImages) {
            const files = e.target.files;
            if (files) {
                console.log("files");
                const file = files[0];
                const allowTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
                if (!allowTypes.includes(file.type)) {
                    alert("Невірний формат файлу");
                    return;
                }
                const upload: IUploadImage = {
                    media: file
                }
                console.log(upload);
                apiForm.post<IUploadImageResult>('/tweets/uploadMedia', upload, {
                })
                    .then(resp => {
                        setImages([...images, resp.data]);
                        formik.setFieldValue("mediaIds", [...formik.values.mediaIds, resp.data.id]);
                        setGrid();
                        if (images.length == 3)
                            setDisableImages(true);
                    })
                    .catch(bad => {
                        console.log("Bad request", bad);
                    })

            }
        }
    }


    return (
        <div className="w-full bg-content1 rounded-xl rounded-b-none flex z-10 relative border-b-1 border-content3">
            <form onSubmit={formik.handleSubmit} className={"w-full"}>
                <div className={"w-full flex flex-col p-4"}>
                    <Textarea
                        label="Create post"

                        value={formik.values.tweetText}
                        name={"tweetText"}
                        onChange={formik.handleChange}
                        classNames={{
                            inputWrapper: "bg-transparent"
                        }}
                        className="w-full bg-transparent"
                    />
                    <div className='w-full grid gap-[3px] mt-[10px] rounded-[5px] overflow-hidden border-1 border-[#31343B] max-h-[400px]' style={{gridTemplateColumns: gridColumns, gridTemplateRows: gridRows}}>

                        {images.map((img, i) => (
                            <div key={img.id} className="col position-relative"
                                 style={i == 0 && images.length == 3 ? {gridRowStart: 1, gridRowEnd: 3} : {}}>
                                <div className="h-full">
                                    {getExtension(img.path) == "gif"
                                        ?
                                        <img
                                            src={`${import.meta.env.VITE_IMAGES_URL}` + img.path}
                                            className="object-cover"
                                            alt="Зображення"
                                            style={{height: '100%', width: '100%', overflow: 'hidden'}}
                                        />
                                        :
                                        <img
                                            src={images.length == 1 ? `${import.meta.env.VITE_IMAGES_URL}/1280_` + img.path : `${import.meta.env.VITE_IMAGES_URL}/600_` + img.path}
                                            className="img-fluid"
                                            alt="Зображення"
                                            style={{height: '100%', width: '100%', overflow: 'hidden'}}
                                        />
                                    }

                                </div>

                            </div>
                        ))}
                    </div>
                    <div className={"mt-[10px] flex gap-[10px] justify-between items-center"}>
                        <div>
                            <label htmlFor="file-input">
                                <CiImageOn size={20}/>
                            </label>

                            <input id="file-input" accept="image/png, image/gif, image/jpeg"
                                   onChange={onChangeImageHandler}
                                   style={{display: 'none'}} height={0} width={0} type="file" disabled={disableImages}/>
                        </div>
                        <Button color={"primary"} variant={"flat"} type={"submit"}>
                            Post
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    )
};

export default CreatePost;