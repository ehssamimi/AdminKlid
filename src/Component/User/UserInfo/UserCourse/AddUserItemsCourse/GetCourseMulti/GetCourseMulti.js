 import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';






export default function GetCourseMulti(props) {
    let {error,name,getnamefromOption}=props;
    // console.log(error)

    const [open, setOpen] = React.useState(false);
    const [defaultValue, setdefaultValue] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [inputValue, setinputValue] = React.useState('a');
    const loading = open && options.length === 0;


    const handelChange = async (event) => {
        console.log("handelChange")
        let {value} = event.target;
        setinputValue(value);
        let parents = await props.getOption(inputValue);
        console.log("parents")
        console.log(parents)
        setOptions(parents);
    };

    React.useEffect(() => {
        console.log('useEffect')

        let active = true;

        if (!loading) {
            return undefined;
        }

        async function getOptionFromParent() {
            console.log("getOptionFromParent")
            let parents = await props.getOption(inputValue);
            setOptions(parents);

        }
        getOptionFromParent()

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open] );

    React.useEffect(() => {

        setdefaultValue(props.DefaultValue );

    },[props.DefaultValue] );

// console.log("inputValue");
// console.log(inputValue);
// console.log("options");
// console.log(options);
// console.log("defaultValue")
// console.log(defaultValue)

    return (


        // <Autocomplete
        //     multiple
        //     id={name}
        //     className={"col-12 m-2 ltr"}
        //     open={open}
        //     onOpen={() => {
        //         setOpen(true);
        //     }}
        //     onClose={() => {
        //         setOpen(false);
        //     }}
        //     getOptionSelected={(option, value) => option[`${getnamefromOption}`] === value[`${getnamefromOption}`]}
        //     getOptionLabel={(option) => option[`${getnamefromOption}`]}
        //     options={options}
        //     loading={loading}
        //
        //     value={defaultValue}
        //     onChange={(event, newValue) => {
        //         setdefaultValue(newValue);
        //         props.GetValues(newValue, name);
        //     }}
        //
        //     renderInput={(params) => (
        //         <TextField
        //             {...params}
        //             error={error.length>2?true:false}
        //             helperText={error.length>2? error :""}
        //             label={name}
        //             onChange={handelChange}
        //             variant="outlined"
        //             InputProps={{
        //                 ...params.InputProps,
        //                 endAdornment: (
        //                     <React.Fragment>
        //                         {loading ? <CircularProgress color="inherit" size={20}/> : null}
        //                         {params.InputProps.endAdornment}
        //
        //                     </React.Fragment>
        //                 ),
        //             }}
        //         />
        //
        //
        //     )}
        //

      //  {/*/>*/}



        <Autocomplete
            multiple
            className={"col-12 m-2 "}
            id="tags-outlined"
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            loading={loading}
            options={options}
            getOptionSelected={(option, value) => option.id === value.id}
            // getOptionSelected={(option, defaultValue) =>   defaultValue.name}
            // getOptionSelected={(defaultValue)=>defaultValue.map(item=>item.name )}
            // getOptionSelected={(defaultValue)=>defaultValue.name}

            getOptionLabel={(option) => option.name + (option.field!=="" ?(" - "+option.field):"")}
            // defaultValue={[top100Films[13]]}
            filterSelectedOptions
            value={defaultValue}
            onChange={(event, newValue) => {
                setdefaultValue(newValue);
                props.GetValues(newValue, name);
            }}

            renderInput={(params) => (

                <TextField
                    {...params}
                    error={error.length > 2 ? true : false}
                    helperText={error.length > 2 ? error : ""}
                    label={name}
                    onChange={handelChange}
                    variant="standard"
                    className={"ltr"}
                     InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}

                            </React.Fragment>
                        ),
                    }}
                />


            )}
        />

    );

}
 // {/*<TextField*/}
 //     {/*{...params}*/}
 //     {/*variant="outlined"*/}
 //     {/*label="filterSelectedOptions"*/}
 //     {/*placeholder="Favorites"*/}
 // {/*/>*/}